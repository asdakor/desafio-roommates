const inicio = async (req, res) => {
    try {
        return res.json({ok:true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

export const webController = {
    inicio
}