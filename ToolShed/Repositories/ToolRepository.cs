using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using ToolShed.Models;
using ToolShed.Utils;

namespace ToolShed.Repositories
{
    public class ToolRepository : BaseRepository, IToolRepository
    {
        public ToolRepository(IConfiguration configuration) : base(configuration) { }

        public List<Tool> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT t.Id AS ToolId, t.[Name] AS ToolName, t.[Description], t.ConditionId AS ToolConditionId, t.UserId,
                               c.Id AS ConditionId, c.Name AS ConditionName

                          FROM Tool t
                     LEFT JOIN Condition c ON t.ConditionId = c.Id
                      ORDER BY t.[Name]";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var tools = new List<Tool>();
                        while (reader.Read())
                        {
                            tools.Add(new Tool()
                            {
                                Id = DbUtils.GetInt(reader, "ToolId"),
                                Name = DbUtils.GetString(reader, "ToolName"),
                                Description = DbUtils.GetString(reader, "Description"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Condition = new Condition()
                                {
                                    Id = DbUtils.GetInt(reader, "ConditionId"),
                                    Name = DbUtils.GetString(reader, "ConditionName"),
                                },
                            });
                        }
                        return tools;
                    }
                }
            }
        }
        public Tool GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT t.Id AS ToolId, t.Name AS ToolName, t.Description, t.ConditionId AS ToolConditionId, t.UserId AS ToolUserId,
                               u.Id AS UserId, u.Name AS UserName,
                               c.Id AS ConditionId, c.Name AS ConditionName,
                               tc.Id AS ToolCommentId, tc.ToolId , tc.UserId AS ToolCommentUserId , tc.Body
                          FROM Tool t
                     LEFT JOIN Users u ON t.UserId = u.id
                     LEFT JOIN Condition c ON t.ConditionId = c.Id
                     LEFT JOIN ToolComment tc ON t.Id = tc.ToolId
                         WHERE t.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Tool tool = null;
                        while (reader.Read())
                        {
                            if (tool == null)
                            {
                                tool = new Tool()
                                {
                                    Id = id,
                                    Name = DbUtils.GetString(reader, "ToolName"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    Condition = new Condition()
                                    {
                                        Id = DbUtils.GetInt(reader, "ConditionId"),
                                        Name = DbUtils.GetString(reader, "ConditionName"),
                                    },
                                    User = new User()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserId"),
                                        Name = DbUtils.GetString(reader, "UserName"),
                                    }
                                };
                            }

                        }
                        return tool;
                    }
                }
            }
        }
        public List<Tool> GetByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT t.Id AS ToolId, t.Name AS ToolName, t.Description, t.ConditionId, t.UserId AS ToolUserId,
                               u.Id AS UserId, u.Name AS UserName,
                               c.Id AS ConditionId, c.Name AS ConditionName
                          FROM Tool t
                     LEFT JOIN Users u ON t.UserId = u.id
                     LEFT JOIN Condition c ON t.ConditionId = c.Id
                         WHERE t.UserId = @UserId";
                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var tools = new List<Tool>();
                        while (reader.Read())
                        {
                            tools.Add(new Tool
                            {
                                Id = DbUtils.GetInt(reader, "ToolId"),
                                Name = DbUtils.GetString(reader, "ToolName"),
                                Description = DbUtils.GetString(reader, "Description"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Name = DbUtils.GetString(reader, "UserName"),
                                },
                                Condition = new Condition()
                                {
                                    Id = DbUtils.GetInt(reader, "ConditionId"),
                                    Name = DbUtils.GetString(reader, "ConditionName"),
                                }
                            });

                        }
                        return tools;
                    }
                }
            }
        }
        public void Add(Tool tool)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Tool ([Name], [Description], ConditionId, UserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Name, @Description, @ConditionId, @UserId)";

                    DbUtils.AddParameter(cmd, "@Name", tool.Name);
                    DbUtils.AddParameter(cmd, "@Description", tool.Description);
                    DbUtils.AddParameter(cmd, "@ConditionId", tool.ConditionId);
                    DbUtils.AddParameter(cmd, "@UserId", tool.UserId);

                    tool.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Tool tool)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Tool
                           SET Name = @Name,
                               Description = @Description,
                               ConditionId = @ConditionId,
                               UserId = @UserId
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", tool.Name);
                    DbUtils.AddParameter(cmd, "@Description", tool.Description);
                    DbUtils.AddParameter(cmd, "@ConditionId", tool.ConditionId);
                    DbUtils.AddParameter(cmd, "@UserId", tool.UserId);

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
                    cmd.CommandText = "DELETE FROM Tool WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
