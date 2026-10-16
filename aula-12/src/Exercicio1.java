// Aula 12 - Exercício 1: laço reescrito como pipeline (stream)
// Online: https://onecompiler.com/java  (cole o código inteiro; a classe se chama Main)
// Local:  java Exercicio1.java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> nums = List.of(3, 8, 5, 12, 7, 6);

        int soma = nums.stream()
                       .filter(n -> n % 2 == 0)   // mantém os pares
                       .mapToInt(n -> n * n)      // eleva ao quadrado
                       .sum();                    // reduz à soma

        System.out.println(soma);                 // 244
    }
}
