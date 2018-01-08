using Fasih;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Models
{
    public class DALUsers
    {
        protected DALUsers() { }
        public virtual string InsertUpdateUser(BALUsers BAL)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@ID", BAL.ID),
                                       new SqlParameter("@FirstName",BAL.FirstName),
                                       new SqlParameter("@LastName", BAL.LastName),
                                       new SqlParameter("@UserName", BAL.UserName),
                                       new SqlParameter("@Email", BAL.Email),
                                       new SqlParameter("@Pass", BAL.Pass),
                                       new SqlParameter("@ImgUrl", "Sample.png"),
                                       new SqlParameter("@IsEmailConfirmed", BAL.IsEmailConfirmed),
                                       new SqlParameter("@IsActive", BAL.IsActive),
                               };
            return FCommon.CheckString(SqlHelper.ExecuteScalar(FCommon.ConStr, CommandType.StoredProcedure, "spInsertUpdateUsers", param));



        }
        public virtual DataRow GetUserDataByEmailOrUserID(string UserID, string Email)
        {
            SqlParameter[] param = {
                                   new SqlParameter("@UserID", UserID),
                                   new SqlParameter("@Email", Email)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spGetUserDataByEmailOrUserID", param).Rows[0];
        }
        public virtual DataRow LoginAuthentication(string Email, string Pass)
        {
            SqlParameter[] param = {
                                   new SqlParameter("@Email", Email),
                                   new SqlParameter("@Pass", Pass)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spLoginAuthentication", param).Rows[0];
        }
        public virtual DataRow GetUsers(string UserID, string UserName, string Email)
        {
            SqlParameter[] param = {
                                   new SqlParameter("@UserID", UserID),
                                   new SqlParameter("@UserName", UserName),
                                   new SqlParameter("@Email", Email)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spGetUsers", param).Rows[0];
        }

        public virtual DataTable InsertDeleteFollowers(string UserID, string FollowerID)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@UserID", UserID),
                                       new SqlParameter("@FollowerID", FollowerID)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spInsertDeleteFollowers", param);
        }
        public virtual string InsertDeleteFollowings(string UserID, string FollowingID)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@UserID", UserID),
                                       new SqlParameter("@FollowingID", FollowingID)
                               };
            return FCommon.CheckString(SqlHelper.ExecuteScalar(FCommon.ConStr, CommandType.StoredProcedure, "spInsertDeleteFollowings", param));
        }

        public virtual DataTable GetFollowers(string UserID, string FollowerID)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@UserID", UserID),
                                       new SqlParameter("@FollowerID", FollowerID)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spGetFollowers", param);
        }
        public virtual DataTable GetFollowings(string UserID, string FollowingID)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@UserID", UserID),
                                       new SqlParameter("@FollowingID", FollowingID)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spGetFollowings", param);
        }

        public virtual DataTable MainSearch(string UserID, string SearchText)
        {
            SqlParameter[] param = {
                                       new SqlParameter("@UserID", UserID),
                                       new SqlParameter("@SearchText", SearchText)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spMainSearch", param);
        }


        public virtual DataRow GetUserDetailsForProfile(string MyID, string UserID)
        {
            SqlParameter[] param = {
                                   new SqlParameter("@MyID", MyID),
                                   new SqlParameter("@UserID", UserID)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spGetUserDetailsForProfile", param).Rows[0];
        }

        public virtual DataRow InsertUserInterestedCategories(string UserID, string RefIDs)
        {
            SqlParameter[] param = {
                                   new SqlParameter("@UserID", UserID),
                                   new SqlParameter("@RefIDs", RefIDs)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spInsertUserInterestedCategories", param).Rows[0];
        }

        public virtual DataRow InsertUpdateInvitation(string UserID, string ToEmail, int IsAccepted)
        {
            SqlParameter[] param = {
                                   new SqlParameter("@UserID", UserID),
                                   new SqlParameter("@ToEmail", ToEmail),
                                   new SqlParameter("@IsAccepted", IsAccepted)
                               };
            return SqlHelper.ExecuteDataTable(FCommon.ConStr, CommandType.StoredProcedure, "spInsertUpdateInvitation", param).Rows[0];
        }
    }
}