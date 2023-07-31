using Microsoft.Extensions.Configuration;
using ToolShed.Models;
using ToolShed.Utils;

namespace ToolShed.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.FirebaseUserId, u.[Name], u.Email
                          FROM Users u
                         WHERE FirebaseUserId = @FirebaseUserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }
        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Users (FirebaseUserId, [Name], Email, UserTypeId, Activated)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @Name, @Email, @UserTypeId, @Activated)";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@UserTypeId", user.UserTypeId);
                    DbUtils.AddParameter(cmd, "@Activated", user.Activated);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Users
                           SET Name = @Name,
                               Email = @Email
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", user.Id);
                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}