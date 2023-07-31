using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using ToolShed.Models;
using ToolShed.Utils;

namespace ToolShed.Repositories
{
    public class ToolCommentRepository : BaseRepository, IToolCommentRepository
    {
        public ToolCommentRepository(IConfiguration configuration) : base(configuration) { }
        public List<ToolComment> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT tc.Id AS ToolCommentId, tc.ToolId, tc.UserId, tc.Body,
                               u.Id As UserId, u.Name
                          FROM ToolComment tc 
                     LEFT JOIN Users u ON tc.UserId = u.Id";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var toolComments = new List<ToolComment>();
                        while (reader.Read())
                        {
                            toolComments.Add(new ToolComment()
                            {
                                Id = DbUtils.GetInt(reader, "ToolCommentId"),
                                ToolId = DbUtils.GetInt(reader, "ToolId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Body = DbUtils.GetString(reader, "Body"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                }
                            });
                        }
                        return toolComments;
                    }
                }
            }
        }
        public ToolComment GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT tc.Id AS ToolCommentId, tc.ToolId, tc.UserId, tc.Body,
                               u.Id As UserId, u.Name
                          FROM ToolComment tc 
                     LEFT JOIN Users u ON tc.UserId = u.Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        ToolComment toolComment = null;
                        while (reader.Read())
                        {
                            if (toolComment == null)
                            {
                                toolComment = new ToolComment()
                                {
                                    Id = id,
                                    ToolId = DbUtils.GetInt(reader, "ToolId"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    Body = DbUtils.GetString(reader, "Body"),
                                    User = new User()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserId"),
                                        Name = DbUtils.GetString(reader, "Name"),
                                    }
                                };
                            }
                        }
                        return toolComment;
                    }
                }
            }
        }
        public List<ToolComment> GetByToolId(int toolId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT tc.Id AS ToolCommentId, tc.ToolId, tc.UserId, tc.Body,
                               u.Id As UserId, u.Name
                          FROM ToolComment tc 
                     LEFT JOIN Users u ON tc.UserId = u.Id
                         WHERE tc.ToolId = @ToolId";

                    DbUtils.AddParameter(cmd, "@ToolId", toolId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var toolComments = new List<ToolComment>();
                        while (reader.Read())
                        {
                            toolComments.Add(new ToolComment
                            {
                                Id = DbUtils.GetInt(reader, "ToolCommentId"),
                                ToolId = DbUtils.GetInt(reader, "ToolId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Body = DbUtils.GetString(reader, "Body"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                }
                            });
                        }
                        return toolComments;
                    }
                }
            }
        }
        public void Add(ToolComment toolComment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO ToolComment (ToolId, UserId, Body)
                        OUTPUT INSERTED.ID
                        VALUES (@ToolId, @UserId, @Body)";

                    DbUtils.AddParameter(cmd, "@ToolId", toolComment.ToolId);
                    DbUtils.AddParameter(cmd, "@UserId", toolComment.UserId);
                    DbUtils.AddParameter(cmd, "@Body", toolComment.Body);

                    toolComment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(ToolComment toolComment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE ToolComment
                           SET ToolId = @ToolID,
                               UserId = @UserId,
                               Body = @Body
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@ToolId", toolComment.ToolId);
                    DbUtils.AddParameter(cmd, "@UserId", toolComment.UserId);
                    DbUtils.AddParameter(cmd, "@Body", toolComment.Body);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM ToolComment WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
