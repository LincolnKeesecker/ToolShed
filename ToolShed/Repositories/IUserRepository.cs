using ToolShed.Models;

namespace ToolShed.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        void Update(User user);
        User GetByFirebaseUserId(string firebaseUserId);
    }
}