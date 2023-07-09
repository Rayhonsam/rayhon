import java.util.*;
import java.sql.*;
import java.io.*;

public class database {
    public static void main(String[] args) throws Exception {
        deleterec();
    }
    public static void readRecord() throws Exception
    {
        String url="jdbc:mysql://localhost:3306/dbms";
        String username="root";
        String password="samo@2004";
        String query="SELECT * from movie";

        Connection con=DriverManager.getConnection(url, username, password);
        Statement st=con.createStatement();
        ResultSet rs=st.executeQuery(query);

        while(rs.next())
        {
            System.out.println(rs.getInt(1));
            System.out.println(rs.getString(2));
            System.out.println(rs.getString(3));
        }
    }
    public static void writerec() throws Exception
    {
        String url="jdbc:mysql://localhost:3306/dbms";
        String username="root";
        String password="samo@2004";
        String query="INSERT INTO movie values(4,'ffkk','fjfjf')";

        Connection con=DriverManager.getConnection(url,username,password);
        Statement st=con.createStatement();
        int res=st.executeUpdate(query);
        System.out.println("no of rows affected:"+res);
    }
    public static void writerec1() throws Exception
    {
        String url="jdbc:mysql://localhost:3306/dbms";
        String username="root";
        String password="samo@2004";
        int id=5;
        String mname="anjaan";
        String mrev="super";
        String query="INSERT INTO movie values(?,?,?)";

        Connection con=DriverManager.getConnection(url, username, password);
        PreparedStatement ps=con.prepareStatement(query);
        ps.setInt(1,id);
        ps.setString(2,mname);
        ps.setString(3,mrev);
        int res=ps.executeUpdate();
        System.out.println("no of rows affected:"+res);
    }
    public static void deleterec() throws Exception
    {
        String url="jdbc:mysql://localhost:3306/dbms";
        String username="root";
        String password="samo@2004";
        String query="delete from movie where id=5";
        Connection con=DriverManager.getConnection(url, username, password);
        Statement st=con.createStatement();
        int res=st.executeUpdate(query);
        System.out.println("no of rows deleted:"+res);
    }
    public static void updaterec() throws Exception
    {
        String url="jdbc:mysql://localhost:3306/dbms";
        String username="root";
        String password="samo@2004";
        String query="delete from movie where id=5";
        Connection con=DriverManager.getConnection(url, username, password);
        Statement st=con.createStatement();
        int res=st.executeUpdate(query);
        System.out.println("no of rows deleted:"+res);
    }
}
