import java.util.Scanner;
 
class CurrencyConversion
{
 
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        System.out.println("1. GBP to EUR (1:1).");
        System.out.println("2. GBP to USD, CAD (1:1.5).");
        System.out.println("3. GBP to MXN (1:20).");
        System.out.println("4. GBP to SEK (1:10).");
        System.out.println("Enter you option : ");
        int option = in.nextInt();
        double gbp = 0;
        switch (option) {
            case 1:
                System.out.println("Enter value in EUR : ");
                double eur = in.nextDouble();
                gbp = eur;
                System.out.println("Corresponding GBP : "+gbp);
                break;
            case 2:
                System.out.println("Enter value in USD : ");
                double usd = in.nextDouble();
                // gbp = (usd/3)*2;
                gbp = (usd/1.5);
                System.out.println("Corresponding GBP : "+gbp);
                break;
            case 3:
                System.out.println("Enter value in MXN : ");
                double MXN = in.nextDouble();
                gbp = MXN/20;
                System.out.println("Corresponding GBP : "+gbp);
                break;
            case 4:
                System.out.println("Enter value in SEK : ");
                double SEK = in.nextDouble();
                gbp = SEK/10;
                System.out.println("Corresponding GBP : "+gbp);    
                break;
        
            default:
                break;
        }
 
    }
 
}