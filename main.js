function calcularCuotas() {
    let montoTotal = parseFloat(prompt('Ingrese el monto total:'));
    let cantidadCuotas = parseFloat(prompt('Ingrese la cantiad de cuotas:'));

    if (montoTotal - montoTotal === 0 && cantidadCuotas - cantidadCuotas === 0) {
        
        let pagoPorCuota = montoTotal / cantidadCuotas;
        alert('El pago por cuota es de: ' + '💲' + parseInt(pagoPorCuota));
        
    } else { 
        alert('Ingrese valores númericos y una cantidad de cuotas 😓');
    }
}
calcularCuotas();
