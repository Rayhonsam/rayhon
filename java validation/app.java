import java.awt.Label;
import java.awt.TextField;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.Statement;
import java.net.ConnectException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;

public class app {
    public static void main(String[] args){
        JFrame main=new JFrame("area of interest");
        JTextArea a1;
        JLabel l1,l2,l3,l4;
        JTextField t1,t2,t3,t4,t5,t6;
        JButton b1,b2,b3,b4,b5,b6;
        final JTable datatable;
        final DefaultTableModel tablemodel;
        l1=new JLabel("enter the name");
        l2=new JLabel("enter the roll no=");
        l3=new JLabel("enter the reg no=");
        l4=new JLabel("enter the area of interest=");
        t1=new JTextField("name");
        t2=new JTextField("roll no");
        t3=new JTextField("reg no");
        t4=new JTextField("area of interest");
        t5=new JTextField("roll no");
        a1=new JTextArea(null, null, 0, 0);
        b1=new JButton("insert");
        b2=new JButton("delete");
        b3=new JButton("update");
        b4=new JButton("read");
        b5=new JButton("submit");
        t1.setBounds(100, 30, 150, 20);
        t2.setBounds(100, 70, 150, 20);
        t3.setBounds(100, 110, 150, 20);
        t4.setBounds(100, 150, 150, 20);
        l1.setBounds(20, 20, 100, 30);
        l2.setBounds(20, 60, 100, 30);
        l3.setBounds(20, 100, 100, 30);
        l4.setBounds(20, 140, 100, 30);
        b1.setBounds(60,200,100,30);
        b2.setBounds(130,200,100,30);
        b3.setBounds(200,200, 100, 30);
        b4.setBounds(260, 200, 100, 30);
        a1.setBounds(60,250,100,50);
        main.add(l1);
        main.add(l2);
        main.add(l3);
        main.add(l4);
        main.add(t1);
        main.add(t2);
        main.add(t3);
        main.add(t4);
        main.add(b1);
        main.add(b2);
        main.add(b3);
        main.add(b4);
        main.add(a1);
        main.setLayout(null);
        main.setSize(500,1000);
        main.setVisible(true);
        b1.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent ae){
                String name=t1.getText();
                int roll=Integer.parseInt(t2.getText());
                String reg=t3.getText();
                String interest=t4.getText();
                try
                {
                    String url="jdbc:mysql://localhost:3306/dbms";
                    String username="root";
                    String password="samo@2004";
                    String query="insert into stud1 values(?,?,?,?)";
                    Connection con=DriverManager.getConnection(url, username, password);
                    PreparedStatement ps=con.prepareStatement(query);
                    ps.setString(1,name);
                    ps.setInt(2,roll);
                    ps.setString(3, reg);
                    ps.setString(4, interest);
                    int res=ps.executeUpdate();
                    a1.setText("successfully insertred");

                }
                catch(Exception e){
                    a1.setText(e.toString());
                }
            }
        });
        b2.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent ae){
                TextField t5=new TextField("Enter regno:");
                t5.setBounds(180,300, 100, 50);
                main.add(t5);
                b5.setBounds(180, 400, 100, 50);
                main.add(b5);
                JButton b6=new JButton("try");
                b5.setBounds(200,400,100,50);
                main.add(b5);
                b5.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent ae) 
            {
                  try
                  {
                    String regno=t5.getText();
                    String url="jdbc:mysql://localhost:3306/dbms";
                    String username="root";
                    String password="samo@2004";
                    String query="delete from stud1 where reg=?";
                    Connection con=DriverManager.getConnection(url, username, password);
                    PreparedStatement ps=con.prepareStatement(query);
                    ps.setString(1, regno);
                    int res=ps.executeUpdate();
                    System.out.println("no of rows deleted:"+res);
                  }
                  catch(Exception e){
                      System.out.println(e.toString());
                  }
            }
        });
            }
        });
        b3.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent ae){
                String interest=t4.getText();
                String name=t1.getText();
                if(!name.equals("name"))
                {
                  try
                  {
                    String url="jdbc:mysql://localhost:3306/dbms";
                    String username="root";
                    String password="samo@2004";
                    String query="update stud1 set interest=? where sname=?";
                    Connection con=DriverManager.getConnection(url, username, password);
                    PreparedStatement ps=con.prepareStatement(query);
                    ps.setString(1, interest);
                    ps.setString(2, name);
                    int res=ps.executeUpdate();
                    System.out.println("no of rows updated:"+res);
                  }
                  catch(Exception e){
                      System.out.println(e.toString());
                  }
                }
                else{
                    a1.setText("enter the name field");
                }
            }
        });
        b4.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent ae){
                try
                {
                     String url="jdbc:mysql://localhost:3306/dbms";
                String username="root";
                String password="samo@2004";
                String query="SELECT * from movie";
                Connection con=DriverManager.getConnection(url, username, password);
                java.sql.Statement st=con.createStatement();
                ResultSet rs=st.executeQuery("select * from movie");
                tablemodel=new DefaultTableModel(new Object[] {"sname","rolll","reg","area of interest"},0);
                datatable=new JTable(tablemodel);

                while(rs.next())
                {
                     String name=rs.getString("sname");
                     String roll=rs.getString("roll");
                     String reg=rs.getString("reg");
                     String area=rs.getString("area of interest");
                     tablemodel.addRow(new Object[] {name,roll,reg,area});
                }
                JScrollPane scroll=new JScrollPane(datatable);
                scroll.setBounds(100,350, 300,200);
                 main.add(scroll);
                }
                catch(Exception e){
                    
                }
            }
        });
    }
}
