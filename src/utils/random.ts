function AleatorioCada10Segundos<Number>() {
    setInterval(() => {
      const numeroAleatorio = Math.floor(Math.random() * 37);
      console.log('Número aleatorio generado:', numeroAleatorio);
    }, 1000);
  }