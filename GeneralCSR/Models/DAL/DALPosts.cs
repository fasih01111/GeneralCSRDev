using Fasih;
using System.Data;
using System.Data.SqlClient;

namespace Models
{
    public class DALPosts
    {
        protected DALPosts() { }

        public virtual DataRow InsertUpdateCategories(string ID, string Name, string IsActive)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@ID", ID),
                                       new SqlParameter("@Name",Name),
                                       new SqlParameter("@IsActive",IsActive)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spInsertUpdateCategories", param).Rows[0];
        }
        public virtual DataTable GetCategories(string ID, string Name)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@ID", ID),
                                       new SqlParameter("@Name",Name)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spGetCategories", param);
        }

        public virtual DataRow InsertUpdatePosts(BALPosts BAL)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@ID", BAL.ID),
                                       new SqlParameter("@UserID",BAL.UserID),
                                       new SqlParameter("@Title",BAL.Title),
                                       new SqlParameter("@CatID",BAL.CategoryID),
                                       new SqlParameter("@Body", BAL.Body),
                                       new SqlParameter("@IsPublic", BAL.IsPublic),
                                       new SqlParameter("@IsActive", BAL.IsActive),
                                       new SqlParameter("@OriginalName", BAL.OrignalName),
                                       new SqlParameter("@GeneratedName", BAL.GeneratedName)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spInsertUpdatePosts", param).Rows[0];
        }
        public virtual DataTable GetPosts(string MyID, string ID, string UserID, string Offset, string Next)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@MyID", MyID),
                                       new SqlParameter("@ID", ID),
                                       new SqlParameter("@UserID", UserID),
                                       new SqlParameter("@Offset", Offset),
                                       new SqlParameter("@Next", Next)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spGetPosts", param);
        }

        public virtual DataTable GetPostsIFollow(string MyID, string ID, string UserID)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@MyID", MyID),
                                       new SqlParameter("@ID", ID),
                                       new SqlParameter("@UserID", UserID)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spGetPostsIFollow", param);
        }
        public virtual DataTable InsertUpdateComment(string ID, string UserID, string RefID, string RefType, string Comment, bool IsActive, string OrignalName, string GeneratedName)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@ID", ID),
                                       new SqlParameter("@UserID", UserID),
                                       new SqlParameter("@RefID", RefID),
                                       new SqlParameter("@RefType", RefType),
                                       new SqlParameter("@Comment", Comment),
                                       new SqlParameter("@IsActive", IsActive),
                                       new SqlParameter("@OriginalName", OrignalName),
                                       new SqlParameter("@GeneratedName", GeneratedName)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spInsertUpdateComment", param);
        }

        public virtual DataTable InsertUpdateCommentAttachment(string ID, string UserID, string RefID, string Description, bool IsActive, string OrignalName, string GeneratedName)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@ID", ID),
                                       new SqlParameter("@UserID", UserID),
                                       new SqlParameter("@RefID", RefID),
                                       new SqlParameter("@Description", Description),
                                       new SqlParameter("@IsActive", IsActive),
                                       new SqlParameter("@OriginalName", OrignalName),
                                       new SqlParameter("@GeneratedName", GeneratedName)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spInsertUpdateCommentAttachment", param);
        }

        public virtual DataTable GetComments(string MyID, string ID, string RefID, string RefType)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@MyID", MyID),
                                       new SqlParameter("@ID", ID),
                                       new SqlParameter("@RefID", RefID),
                                       new SqlParameter("@RefType", RefType)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spGetComments", param);
        }

        public virtual DataTable GetCommentsByCount(string MyID, string ID, string RefID, string RefType, string Offset, string Next)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@MyID", MyID),
                                       new SqlParameter("@ID", ID),
                                       new SqlParameter("@RefID", RefID),
                                       new SqlParameter("@RefType", RefType),
                                       new SqlParameter("@Offset", Offset),
                                       new SqlParameter("@Next", Next)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spGetCommentsByCount", param);
        }

        public virtual DataTable GetHashtags()
        {
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spGetHashtags");
        }


        public virtual DataTable InsertDeletePostFollow(string ID, string RefID)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@ID", ID),
                                       new SqlParameter("@RefID", RefID)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spInsertDeletePostFollow", param);
        }
        public virtual DataTable InsertDeleteCommentFlagged(string ID, string RefID)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@ID", ID),
                                       new SqlParameter("@RefID", RefID)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spInsertDeleteCommentFlagged", param);
        }

        public virtual DataTable InsertDeleteEndorse(string ID, string RefID)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@ID", ID),
                                       new SqlParameter("@RefID", RefID)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spInsertDeleteEndorse", param);
        }

        public virtual DataTable InsertDeleteSupport(string ID, string RefID)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@ID", ID),
                                       new SqlParameter("@RefID", RefID)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spInsertDeleteSupport", param);
        }
        public virtual DataTable GetPostFollows(string RefID)
        {
            SqlParameter[] param = {

                                       new SqlParameter("@RefID", RefID),
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spGetPostFollows", param);
        }

        public virtual DataTable GetCommentEndorse(string RefID)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@RefID", RefID),
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spGetCommentEndorse", param);
        }
        public virtual DataTable GetCommentSupport(string RefID)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@RefID", RefID),
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spGetCommentSupport", param);
        }

        public virtual DataTable GetAttachments(string RefID, string Type)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@RefID", RefID),
                                       new SqlParameter("@Type", Type),
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spGetAttachments", param);
        }

        public virtual DataTable GetPostAllAttachments(string RefID)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@RefID", RefID)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spGetPostAllAttachments", param);
        }

        public virtual DataTable UpdateCommentStatus(string ID, bool IsActive)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@ID",ID),
                                       new SqlParameter("@IsActive",IsActive)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spUpdateCommentStatus", param);
        }

        public virtual DataTable GetAttachmentsPosts(string CatID)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@CatID",CatID)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spGetAttachmentsPosts", param);
        }

        
    }

}