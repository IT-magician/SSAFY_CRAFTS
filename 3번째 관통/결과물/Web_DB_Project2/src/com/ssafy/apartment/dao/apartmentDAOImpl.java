package com.ssafy.apartment.dao;

import java.sql.*;
import java.util.ArrayList;

import com.mysql.cj.protocol.x.SyncFlushDeflaterOutputStream;
import com.ssafy.apartment.dto.*;
import com.ssafy.util.DBUtil;


public class apartmentDAOImpl implements apartmentDAO {
	XMLParser par = new XMLParser();
	
	@Override
	public ArrayList<apartmentDTO> getApartments(String sigunguCode) throws Exception {
		// TODO Auto-generated method stub
		ArrayList<apartmentDTO> list = new ArrayList<apartmentDTO>();
		
		Connection con = DBUtil.getConnection();
		PreparedStatement pst = con.prepareStatement("select apt, floor, area, dong, transactionAmount, jibun from transaction where sigunguCode like ?");
		pst.setString(1, sigunguCode);

		ResultSet rs = pst.executeQuery();

		if (!rs.next() && !pst.executeQuery(String.format("select * from transaction where sigunguCode like '%s'", sigunguCode)).next()) {
			ArrayList<apartmentDBDTO> list2 = par.getXML("201512", sigunguCode);

			StringBuilder sb = new StringBuilder(list2.toString());
			sb.deleteCharAt(sb.length()-1);
			sb.deleteCharAt(0);

		
			pst.execute("insert into transaction values"+sb.toString());

			
			pst = con.prepareStatement("select apt, floor, area, dong, transactionAmount, jibun from transaction where sigunguCode like ?");
			pst.setString(1, sigunguCode);
			rs = pst.executeQuery();
		}

		while(rs.next()) {
			list.add(new apartmentDTO(rs.getString(1),
										rs.getString(2),
										rs.getString(3),
										rs.getString(4),
										rs.getString(5),
										rs.getString(6)));
		}


		close(pst,con);
		
		return list;
	}

	@Override
	public ArrayList<apartmentDTO> getApartments(String sigunguCode, String dong) throws SQLException, Exception {
		// TODO Auto-generated method stub
		ArrayList<apartmentDTO> list = new ArrayList<apartmentDTO>();
		
		Connection con = DBUtil.getConnection();
		PreparedStatement pst = con.prepareStatement("select apt, floor, area, dong, transactionAmount, jibun from transaction where sigunguCode like ? and dong = ?");
		pst.setString(1, sigunguCode);
		pst.setString(2, dong);

		ResultSet rs = pst.executeQuery(); System.out.println(pst.toString());
		//ResultSet rs = pst.executeQuery(); System.out.println("select apt, floor, area, dong, transactionAmount, jibun from transaction where sigunguCode like '11110' and dong = '내수동'");

		
		if (!rs.next() && !pst.executeQuery(String.format("select * from transaction where sigunguCode like '%s'", sigunguCode)).next()) {
			ArrayList<apartmentDBDTO> list2 = par.getXML("201512", sigunguCode);

			StringBuilder sb = new StringBuilder(list2.toString());
			sb.deleteCharAt(sb.length()-1);
			sb.deleteCharAt(0);

		
			pst.execute("insert into transaction values"+sb.toString());

			
			pst = con.prepareStatement("select apt, floor, area, dong, transactionAmount, jibun from transaction where sigunguCode like ? and dong = ?");
			pst.setString(1, sigunguCode);
			pst.setString(2, dong);
			rs = pst.executeQuery();
		}

		while(rs.next()) {
			list.add(new apartmentDTO(rs.getString(1),
										rs.getString(2),
										rs.getString(3),
										rs.getString(4),
										rs.getString(5),
										rs.getString(6)));
		}


		close(pst,con);
		
		return list;
	}

	@Override
	public void initDBTable() throws Exception {
		// TODO Auto-generated method stub
		Connection con = DBUtil.getConnection();
		PreparedStatement pst = con.prepareStatement("SHOW TABLES LIKE ?");
		pst.setString(1, "transaction");


		if(!pst.executeQuery().next()) {
			pst = con.prepareStatement("CREATE TABLE `transaction` "
					+ "(`apt` VARCHAR(100),"
					+ "`floor` VARCHAR(10),"
					+ "`area` VARCHAR(100),"
					+ "`jibun` VARCHAR(100),"
					+ "`dong` VARCHAR(100),"
					+ "`transactionAmount` VARCHAR(100),"
//					+ "`serialNumber` VARCHAR(100) NOT NULL PRIMARY KEY,"
					+ "`sigunguCode` VARCHAR(100)"
					+ ")");
			pst.execute();
		}
		
		// -------------------------------------------------------------------------
		
		pst = con.prepareStatement("SHOW TABLES LIKE ?");
		pst.setString(1, "userFavor");


		if(!pst.executeQuery().next()) {
			pst = con.prepareStatement("create table userFavor(" + 
					"    id varchar(100)," + 
					"    code varchar(100)," + 
					"    primary key(id,code)" + 
					")");
			pst.execute();
		}

		close(pst,con);
	}

	@Override
	public void close(AutoCloseable... a) throws Exception {
		// TODO Auto-generated method stub
		for (AutoCloseable tmp:a)
			if (tmp != null)
				tmp.close();
	}

	@Override
	public int deleteFavApt(String id, String code) throws SQLException, Exception {
		Connection con = DBUtil.getConnection();
		String q = "Delete from userfavor where id=? and code = ?";
		PreparedStatement st = con.prepareStatement(q);
		st.setString(1, id);
		st.setString(2, code);
		int res = st.executeUpdate();
		
		return res;
	}

	@Override
	public int insertFavApt(String id, String code) throws SQLException, Exception {
		Connection con = DBUtil.getConnection();
		String q = "Insert into userfavor values(?, ?)";
		PreparedStatement st = con.prepareStatement(q);
		st.setString(1, id);
		st.setString(2, code);
		int res = st.executeUpdate();
		
		return res;
	}
	
	@Override
	public ArrayList<String> getUserFavorSync(String id, String code) throws SQLException, Exception {
		// TODO Auto-generated method stub
		Connection con = DBUtil.getConnection();
		PreparedStatement pst = con.prepareStatement("select distinct LEFT(code, " + code.length() + " ) from userFavor where id = ?");
		pst.setString(1, id);
	
		ResultSet rs = pst.executeQuery();
		ArrayList<String> list = new ArrayList();
		while(rs.next())
			list.add(rs.getString(1));
		

		return list;
	}

}
