
import java.util.*;
import java.io.*;
import java.util.regex.Pattern;
public class email {
    public static boolean emailvalidator(String mail)
    {
         String regex="^[a-zA-Z0-9]+(?!.*[-._]{2})[a-zA-Z0-9-_.]+[a-zA-Z0-9]@[a-zA-Z0-9.-]+$";
         if(Pattern.matches(regex,mail))
         {
              return true;
         }
         return  false;
    }
   public static void main(String[] args) {
      String mail="rayhonsam_10@gmail.com";
      System.out.println(emailvalidator(mail));
   }    
}
