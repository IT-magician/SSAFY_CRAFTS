package com.ssafy.member.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.ssafy.member.dto.Member;
import com.ssafy.util.DBUtil;

public class MemberDAOImpl implements MemberDAO {
	
	private static MemberDAO memberdao = new MemberDAOImpl();
	private DBUtil dbutil;
	
	public MemberDAOImpl() {
		dbutil = DBUtil.getInstance();
	}
	
	public static MemberDAO getNoteDAO() {
		return memberdao;
	}
	
	
	public int insertMember(Member m) throws Exception {
		Connection con = null;
		PreparedStatement st = null;
		int res = -1;
		
		con = dbutil.getConnection();
		String q = "Insert into member values(?,?,?,?)";
		st = con.prepareStatement(q);
		int idx=0;
		st.setString(++idx, m.getId());
		st.setString(++idx, m.getPw());
		st.setString(++idx, m.getName());
		st.setString(++idx, m.getAdr());
		res = st.executeUpdate();
		
		dbutil.close(st,con);
		return res;
	}
	
	public int checkDB(Member m) throws Exception {
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		int res=-1;
		
		con = dbutil.getConnection();
		String q = "Select * from member where id=? and pw=?";
		st = con.prepareStatement(q);
		st.setString(1, m.getId());
		st.setString(2, m.getPw());
		rs=st.executeQuery();
		System.out.println("can u see me?");
		if(rs.next()) {
			res=1;
			System.out.println("yes it here it is");
		}
		dbutil.close(rs,st,con);
		return res;
		
	}
	
	public boolean login(String id, String pw) throws Exception {
		Connection con = null;
        PreparedStatement st = null;
        ResultSet rs = null;
        
        con = dbutil.getConnection();
        String q = "Select * from member where id=? and pw = ?";
        st = con.prepareStatement(q);
        st.setString(1, id);
        st.setString(2, pw);
        rs = st.executeQuery();
        
        boolean result = false;
        if(rs.next()) {
       	 result=true;
        } 
        
        dbutil.close(rs, st, con);
        
        
        return result;
	}
	
	@Override
	public void initDBTable() throws SQLException {
		Connection con = DBUtil.getConnection();
		PreparedStatement pst = con.prepareStatement("SHOW TABLES LIKE ?");
		pst.setString(1, "member");


		if(!pst.executeQuery().next()) {
			pst = con.prepareStatement("create table member(" + 
					"    id varchar(100) primary key," + 
					"    pw varchar(100)," + 
					"    name varchar(100)," + 
					"    adr varchar(100)" + 
					")");
			pst.execute();
		}
		
	}
}
