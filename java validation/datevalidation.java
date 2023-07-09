import java.util.*;
import java.io.*;
import java.util.regex.*;

public class datevalidation {
    public static void main(String[] args) {
        int[] days={31,28,31,30,31,30,31,31,30,31,30,31};
        String pat="2004-02-08";
        if(Pattern.matches("[0-9]{4}-[0-9]{2}-[0-9]{2}",pat))
        {
            String[] arr=pat.split("-");
            int month=Integer.parseInt(arr[1]);
            int day=Integer.parseInt(arr[2]);
            System.out.println(month);
            System.out.println(day);
            if(day<=days[month-1] && month<=12)
            {
                System.out.println("valid");
            }
            else
            {
                System.out.println("invalid");
            }
        }
        else
        {
            System.out.println("invalid1");
        }
    }
}
