using System.Collections.Generic;
using ToolShed.Models;

namespace ToolShed.Repositories
{
    public interface IConditionRepository
    {
        void Add(Condition condition);
        void Delete(int id);
        void Edit(string oldName, string newName);
        List<Condition> GetAllConditions();
    }
}