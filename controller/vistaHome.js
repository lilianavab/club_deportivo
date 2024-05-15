export const vistaHome = (req,res) => {
    res.render("home",{
        layout:"main",
        title: "Deportes",
        titleLista:"Lista de Deportes",
    
    })
}