CREATE TABLE [Users] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [UserTool] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [ToolId] int NOT NULL
)
GO

CREATE TABLE [Tool] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [ConditionId] int
)
GO

CREATE TABLE [Condition] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [ToolComment] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [ToolId] int NOT NULL,
  [UserId] int NOT NULL,
  [Body] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [ToolComment] ADD FOREIGN KEY ([ToolId]) REFERENCES [Tool] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [UserTool] ADD FOREIGN KEY ([ToolId]) REFERENCES [Tool] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [UserTool] ADD FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [ToolComment] ADD FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [Tool] ADD FOREIGN KEY ([ConditionId]) REFERENCES [Condition] ([Id])
GO
