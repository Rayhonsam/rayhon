
import java.util.*;
import java.util.regex.Pattern;
import java.io.*;
public class password {
    public static String genpassword(int length)
    {
          String randomVariable = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQSTUVWXYZ0123456789!@#$%^&*";
          String gen="";
          Random random = new Random();
          for(int i=0;i<length;i++)
          {
              int ran = random.nextInt(randomVariable.length());
              gen+=randomVariable.charAt(ran);
          }
          return gen;
    }
    public static boolean isstrong(String password)
    {
          if(password.length()<8)
          {
              return false;
          }
          String regex="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).*$";
          if(!Pattern.matches(password,regex))
          {
              System.out.println("1");
            return false;
          }
          String common=".*(?!.*\\s).*$";
          if(Pattern.matches(password,common))
          {
              System.out.println("2");
            return false;
          }
          return true;
    }
    public static void main(String[] args) {
        String password=genpassword(12);
        System.out.println(password);
        boolean res=isstrong(password);
        System.out.println(res);
    }
}
