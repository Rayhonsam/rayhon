import javax.swing.*;
import javax.swing.table.DefaultTableModel;

import java.awt.TextField;
import java.awt.event.*;
import java.sql.*;
public class data {
    public static void main(String args[]){
        JFrame main=new JFrame("Registration");
        JLabel l1,l2,l3,l4;
        JTextField t1,t2,t3,t4;
        JTextArea a1;
        JButton b1,b3;
        a1=new JTextArea(null, null, 0, 0);
        l1=new JLabel("Name");
        l2=new JLabel("Roll no");
        l3=new JLabel("Address");
        l4=new JLabel("Description");
        b1=new JButton("Create");
        b3=new JButton("Delete");
        t1=new JTextField("Enter your name");
        t2=new JTextField("Enter your Roll no");
        t3=new JTextField("Enter your Address");
        t4=new JTextField("Enter your Description");
        t1.setBounds(100, 30, 150, 20);
        t2.setBounds(100, 70, 150, 20);
        t3.setBounds(100, 110, 150, 20);
        t4.setBounds(100, 150, 150, 20);
        l1.setBounds(20, 20, 100, 30);
        l2.setBounds(20, 60, 100, 30);
        l3.setBounds(20, 100, 100, 30);
        l4.setBounds(20, 140, 100, 30);
        b1.setBounds(60,200,100,30);
        b3.setBounds(250,200,100,30);
        a1.setBounds(60,250,100,50);
        main.add(a1);
        main.add(l1);
        main.add(l2);
        main.add(l3);
        main.add(l4);
        main.add(b1);
        main.add(b3);
        main.add(t1);
        main.add(t2);
        main.add(t3);
        main.add(t4);
        main.setLayout(null);
        main.setSize(500,1000);
        main.setVisible(true);
        b3.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e){
                TextField t5=new TextField();
                t5.setBounds(100, 250, 100, 100);
            }
        });
        b1.addActionListener(new ActionListener(){
public void actionPerformed(ActionEvent e){
    String name=t1.getText();
    String roll_no=t2.getText();
    String Address=t3.getText();
    String Desc=t4.getText();
    a1.setText("Successfully Inserted");
    try{
    Class.forName("com.mysql.jdbc.Driver");
    System.out.println("Connection is successful");
    Connection connection=DriverManager.getConnection("jdbc:mysql://localhost:3306/customer","root","Aravindh@2023");
    Statement statement;
    statement=connection.createStatement();
    String query="insert into Registrations(names,roll_no,Address,Description)values(?,?,?,?)";
    PreparedStatement pstate=connection.prepareStatement(query);
    pstate.setString(1, name);
    pstate.setString(2, roll_no);
    pstate.setString(3, Address);
    pstate.setString(4,Desc);
    pstate.executeUpdate();
    
    }
    catch(Exception exception){
a1.setText(exception.toString());
System.out.println(exception);
    }
}


        });
    }
}
