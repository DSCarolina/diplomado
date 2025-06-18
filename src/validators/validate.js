function validate(schema, target='body') {
    return (req,res, next)=>{
        const data = req[target];
        //paso 1: Verificar que haya datos
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "No data found" });
        }
        //paso 2: Validar contra el schema con opciones
        const {error, value} = schema.validate(data, {
            abortEarly: false, // No detenerse en el primer error ,mostrar todos los errores
            stripUnknown: true //Eliminar campos no definidos en el schema
        });
        //paso 3: Si hay error, retornar error
        if (error) {
            return res.status(400).json({
                message: `Error en la validacióin en  ${target}`,
                details: error.details.map((err) => err.message)
            });
        }
        //paso 4: Reemplazar el body con el valor validado
        req[target] = value;

        //continuar con la siguiente función de middleware
        next();
    }

}
export default validate;