// Aula 12 - Exercício 4: laço reescrito com iteradores
// Online: https://onecompiler.com/rust  (cole o código inteiro)
// Local:  rustc exercicio4.rs && ./exercicio4
fn main() {
    let leituras = [12, 7, 30, -1, 18, 25]; // -1 marca o fim das leituras

    let total: i32 = leituras
        .iter()
        .take_while(|&&x| x >= 0) // para no primeiro negativo, no lugar do break
        .sum();

    println!("{}", total); // 49
}
