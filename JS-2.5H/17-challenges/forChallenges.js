class ForChallenges {
    soru1() {
        //negatif sayı girilene kadar toplama işlemi yapalım
        let toplam = 0;
        let sayac = 0;
        while (true) {
            let input = prompt("Bir sayı girin (negatif girince durur):");
            if (input === null) break;
            let sayi = parseInt(input);
            console.log("Girilen sayı", sayi);
            if (isNaN(sayi)) {
                alert("Geçerli sayı giriniz");
                continue; //Buraya gelirse eğer aşağıdaki kodlar çalışmaz, direkt döngünün başına döner!
            }
            sayac = sayac + 1; // sayı dışında girerse continuden başa döner, rakam dışı girerse sayaç artmasın
            if (sayi < 0) break;
            toplam += sayi;
        }
        alert("Toplam: " + toplam);
        console.log("Toplam: " + toplam, "Girilen sayı adedi", sayac);
    }

    soru2() {
        //kullanıcının girdiği sayıyı 1'e kadar azalt
        let input = prompt("Bir sayı girinizz:");
        if (input === null);
        let sayi = parseInt(input);
        if (sayi == NaN) {
            return
        }
        for (let i = 0; i <= sayi; i--) {
            if (sayi > 0) {
                console.log(sayi);
                sayi = sayi - 1;
            }
        }
    }
}



export class Ornek {
    isimYazdır(isim) {
     return console.log("Hoşgeldiniz " + isim);
    }
}

export class Process {
    isim;
    constructor() {
        const o1 = new Ornek();
        this.isim = o1.isimYazdır("okan buruk");

    }
}