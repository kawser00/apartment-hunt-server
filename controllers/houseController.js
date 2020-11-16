exports.addHouse = (req, res) => {
    const file = req.files.banner
    const { title, location, bedroom, bathroom, description, price, details } = req.body
    const filePath = `${__dirname}/public/uploads/${file.name}`

    file.mv(filePath, err => {
        if (err) console.log(err);

        const newImg = fs.readFileSync(filePath)
        const encImg = newImg.toString('base64')
        let image = {
            contentType: req.files.banner.mimetype,
            size: Number(req.files.banner.size),
            img: Buffer(encImg, 'base64')
        }

        apartmentCollection.insertOne({ title, location, bedroom, bathroom, price, details, banner: image, description })
            .then(result => {
                fs.remove(filePath, err => {
                    if (err) console.log(err);
                    res.send(result)
                })
            })
    })
}