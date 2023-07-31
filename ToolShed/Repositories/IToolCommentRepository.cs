using System.Collections.Generic;
using ToolShed.Models;

namespace ToolShed.Repositories
{
    public interface IToolCommentRepository
    {
        void Add(ToolComment toolComment);
        void Delete(int id);
        List<ToolComment> GetAll();
        ToolComment GetById(int id);
        List<ToolComment> GetByToolId(int toolId);
        void Update(ToolComment toolComment);
    }
}