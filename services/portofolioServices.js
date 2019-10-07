const pool = require("../constants/connectConstants").pool;

const getPortofolio = (request, response) => {
    pool.query("SELECT * FROM portofolio ORDER BY id ASC", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getPortofolioById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query("SELECT * FROM portofolio WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const createPortofolio = (request, response) => {
    const { name, email } = request.body;

    pool.query(
        "INSERT INTO portofolio (name, email) VALUES ($1, $2)",
        [name, email],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).send(`Portofolio added with ID: ${result.insertId}`);
        }
    );
};

const updatePortofolio = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;

    pool.query(
        "UPDATE portofolio SET name = $1, email = $2 WHERE id = $3",
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Portofolio modified with ID: ${id}`);
        }
    );
};

const deletePortofolio = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query("DELETE FROM portofolio WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Portofolio deleted with ID: ${id}`);
    });
};

module.exports = {
    getPortofolio,
    getPortofolioById,
    createPortofolio,
    updatePortofolio,
    deletePortofolio
};