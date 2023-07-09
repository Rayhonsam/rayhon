import java.util.*;
import java.io.*;
import java.util.regex.*;

public class phoneavalidation {
    public static void main(String[] args) {
        String phone="+1-555-123-4567";
        if(Pattern.matches("^[+][0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}",phone))
        {
             System.out.println("internation format");
        }
        else if(Pattern.matches("^[(][0-9]{3}[)]\\s[0-9]{3}-[0-9]{4}",phone))
        {
            System.out.println("nationalformat");
        }
        else
        {
            System.out.println("illegal format");
        }
    }
}
