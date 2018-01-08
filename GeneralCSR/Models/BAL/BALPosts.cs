using System;
using System.Data;
namespace Models
{
    public class BALPosts : DALPosts
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public string Title { get; set; }
        public int CategoryID { get; set; }
        public string Body { get; set; }
        public DateTime Date { get; set; }
        public bool IsPublic { get; set; }
        public bool IsActive { get; set; }
        public string OrignalName { get; set; }
        public string GeneratedName { get; set; }

        public override DataRow InsertUpdateCategories(string ID, string Name, string IsActive)
        {
            return base.InsertUpdateCategories(ID, Name, IsActive);
        }
        public override DataTable GetCategories(string ID, string Name)
        {
            return base.GetCategories(ID, Name);
        }
        public override DataRow InsertUpdatePosts(BALPosts BAL)
        {
            return base.InsertUpdatePosts(BAL);
        }
        public override DataTable GetPosts(string MyID, string ID, string UserID, string Offset, string Next)
        {
            return base.GetPosts(MyID, ID, UserID, Offset, Next);
        }
        public override DataTable GetHashtags()
        {
            return base.GetHashtags();
        }
        public override DataTable GetPostsIFollow(string MyID, string ID, string UserID)
        {
            return base.GetPostsIFollow(MyID, ID, UserID);
        }
        public override DataTable InsertUpdateComment(string ID, string UserID, string RefID, string RefType, string Comment, bool IsActive, string OrignalName, string GeneratedName)
        {
            return base.InsertUpdateComment(ID, UserID, RefID, RefType, Comment, IsActive, OrignalName, GeneratedName);
        }
        public override DataTable InsertUpdateCommentAttachment(string ID, string UserID, string RefID, string Description, bool IsActive, string OrignalName, string GeneratedName)
        {
            return base.InsertUpdateCommentAttachment(ID, UserID, RefID, Description, IsActive, OrignalName, GeneratedName);
        }
        public override DataTable GetComments(string MyID, string ID, string RefID, string RefType)
        {
            return base.GetComments(MyID, ID, RefID, RefType);
        }
        public override DataTable GetCommentsByCount(string MyID, string ID, string RefID, string RefType, string Offset, string Next)
        {
            return base.GetCommentsByCount(MyID, ID, RefID, RefType, Offset, Next);
        }
        public override DataTable InsertDeletePostFollow(string ID, string RefID)
        {
            return base.InsertDeletePostFollow(ID, RefID);
        }
        public override DataTable InsertDeleteCommentFlagged(string ID, string RefID)
        {
            return base.InsertDeleteCommentFlagged(ID, RefID);
        }
        public override DataTable InsertDeleteEndorse(string ID, string RefID)
        {
            return base.InsertDeleteEndorse(ID, RefID);
        }
        public override DataTable InsertDeleteSupport(string ID, string RefID)
        {
            return base.InsertDeleteSupport(ID, RefID);
        }
        public override DataTable GetPostFollows(string RefID)
        {
            return base.GetPostFollows(RefID);
        }
        public override DataTable GetCommentEndorse(string RefID)
        {
            return base.GetCommentEndorse(RefID);
        }
        public override DataTable GetCommentSupport(string RefID)
        {
            return base.GetCommentSupport(RefID);
        }
        public override DataTable GetAttachments(string RefID, string Type)
        {
            return base.GetAttachments(RefID, Type);
        }
        public override DataTable GetPostAllAttachments(string RefID)
        {
            return base.GetPostAllAttachments(RefID);
        }
        public override DataTable UpdateCommentStatus(string ID, bool IsActive)
        {
            return base.UpdateCommentStatus(ID, IsActive);
        }
        public override DataTable GetAttachmentsPosts(string CatID)
        {
            return base.GetAttachmentsPosts(CatID);
        }

    }
}