using Azure;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using ToolShed.Models;
using ToolShed.Utils;

namespace ToolShed.Repositories
{
    public class ConditionRepository : BaseRepository, IConditionRepository, IConditionRepository
    {
        public ConditionRepository(IConfiguration config) : base(config) { }
        public List<Condition> GetAllConditions()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = $@"
                        SELECT Id, [Name]
                        FROM Condition
                        ";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Condition> conditions = new List<Condition>();
                        while (reader.Read())
                        {
                            Condition newCondition = new Condition()
                            {
                                Id = DbUtils.GetInt(reader, "id"),
                                Name = DbUtils.GetString(reader, "name")
                            };

                            conditions.Add(newCondition);
                        }
                        return conditions;
                    }
                }
            }
        }
        public void Add(Condition condition)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    //! If tag already exists, but is deleted, restore it.
                    cmd.CommandText = $@"
                        INSERT INTO Condition ([Name])
                    OUTPUT INSERTED.Id
                             VALUES (@Name) 
                    ";

                    DbUtils.AddParameter(cmd, "@Name", condition.Name);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Edit(string oldName, string newName)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Condition
                           SET [Name] = @NewName
                         WHERE [Name] = @OldName
                    ";

                    DbUtils.AddParameter(cmd, "@NewName", newName);
                    DbUtils.AddParameter(cmd, "@OldName", oldName);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM Condition 
                    WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
