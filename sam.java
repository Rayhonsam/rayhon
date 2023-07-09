
import java.util.*;
import java.io.*;

public class sam 
{
    class node 
    {
        int data;
        node next;
        node(int d)
        {
            data=d;
            next=null;
        }
    }
    public node head=null;
    public node tail=null;
    public void add(int x)
    {
        node n=new node(x);
        if(head==null)
        {
            head=n;
            tail=n;
            tail.next=head;
        }
    }
    public static void main(String[] args) {
       sam s=new sam();
       s.add(12);
       s.add(134);
       s.add(45);
       s.delete(45);
       s.display();
    }
}