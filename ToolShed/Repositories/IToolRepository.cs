using System.Collections.Generic;
using ToolShed.Models;

namespace ToolShed.Repositories
{
    public interface IToolRepository
    {
        void Add(Tool tool);
        void Delete(int id);
        List<Tool> GetAll();
        Tool GetById(int id);
        List<Tool> GetByUserId(int userId);
        List<Tool> Search(string q, bool sortDesc);
        void Update(Tool tool);
    }
}