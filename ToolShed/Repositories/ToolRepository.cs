using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
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
                        SELECT t.Id, t.[Name], t.[Description], t.ConditionId
                          FROM Tool t
                      ORDER BY t.[Name]";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var tools = new List<Tool>();
                        while (reader.Read())
                        {
                            tools.Add(new Tool()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Description = DbUtils.GetString(reader, "Description"),
                                ConditionId = DbUtils.GetInt(reader, "ConditionId")
                            });
                        }
                        return tools;
                    }
                }
            }
        }
        public Tool GetById(int id)
        {
            throw new NotImplementedException();
        }
        public List<Tool> GetByUserId(int userId)
        {
            throw new NotImplementedException();
        }
        public void Add(Tool tool)
        {
            using (var cmd = Connection.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO Tool ([Name], [Description], ConditionId)
                                    OUTPUT INSERTED.ID
                                    VALUES (@Name, @Description, @ConditionId)";
                DbUtils.AddParameter(cmd, "@Name", tool.Name);
            }
        }
        public void Update(Tool tool)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
