const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const mysql = require("mysql2");
app.use(cors());

app.use(express.json());

// app.get('/api', (req, res) => {
//   res.send('boquita');
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost", // O "127.0.0.1",
  port: "3306",
  user: "luana",
  password: "19denoviembre",
  database: "myfactura",
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Ruta protegida de ejemplo
app.get('/api/protected', authenticateJWT, (req, res) => {
  res.send('This is a protected route');
});



// Definir la ruta para guardar los datos del formulario
app.post("/api/cliente", (req, res) => {
  const { nombre, apellido, cuit, correo, numerotel, direccion } = req.body;

  const query =
    "INSERT INTO clientes (nombre, apellido, cuit, correo, numerotel, direccion) VALUES (?, ?, ?, ?, ?,?)";
  db.query(
    query,
    [nombre, apellido, cuit, correo, numerotel, direccion],
    (err, result) => {
      if (err) {
        console.error("Error insertando datos en la base de datos:", err);
        res
          .status(500)
          .json({ error: "Error insertando datos en la base de datos" });
        return;
      }
      res.status(200).json({ message: "Datos guardados exitosamente" });
    }
  );
});

// Iniciar el servido

app.post("/api/producto", (req, res) => {
  const { nombrepro, codigopro, preciopro, cantidad } = req.body;

  const query =
    "INSERT INTO productos (nombrepro, codigopro, preciopro, cantidad) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [nombrepro, codigopro, preciopro, cantidad],
    (err, result) => {
      if (err) {
        console.error("Error insertando datos en la base de datos:", err);
        res
          .status(500)
          .json({ error: "Error insertando datos en la base de datos" });
        return;
      }
      res.status(200).json({ message: "Datos guardados exitosamente" });
    }
  );
});

app.get("/api/productos", (req, res) => {
  const query = "SELECT * FROM productos";
  db.query(query, (err, rows) => {
    if (err) {
      console.error("Error obteniendo productos:", err);
      res.status(500).json({ error: "Error obteniendo productos" });
      return;
    }
    res.json(rows);
  });
});

app.delete("/api/producto/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM productos WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error eliminando datos de la base de datos:", err);
      res
        .status(500)
        .json({ error: "Error eliminando datos en la base de datos" });
      return;
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  });
});

// Actualizar un producto
app.put("/api/producto/:id", (req, res) => {
  const { id } = req.params;
  const { nombrepro, codigopro, preciopro, cantidad } = req.body;

  const query = `
    UPDATE productos 
    SET nombrepro = ?, codigopro = ?, preciopro = ?, cantidad = ? 
    WHERE id = ?
  `;
  db.query(
    query,
    [nombrepro, codigopro, preciopro, cantidad, id],
    (err, result) => {
      if (err) {
        console.error("Error actualizando datos en la base de datos:", err);
        res
          .status(500)
          .json({ error: "Error actualizando datos en la base de datos" });
        return;
      }
      res.status(200).json({ message: "Datos actualizados exitosamente" });
    }
  );
});



// Buscar cliente por CUIT
app.get('/api/clientes/:cuit', (req, res) => {
  const cuit = req.params.cuit;
  const query = 'SELECT * FROM clientes WHERE cuit = ?';
  db.query(query, [cuit], (err, result) => {
    if (err) {
      console.error('Error al buscar cliente:', err);
      return res.status(500).json({ error: 'Error al buscar cliente' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(200).json(result[0]);
  });
});

// Buscar producto por código
app.get('/api/productos/:codigo', (req, res) => {
  const codigo = req.params.codigo;
  const query = 'SELECT * FROM productos WHERE codigopro = ?';
  db.query(query, [codigo], (err, result) => {
    if (err) {
      console.error('Error al buscar producto:', err);
      res.status(500).json({ error: 'Error al buscar producto' });
    } else {
      res.status(200).json(result[0]);
    }
  });
});



// Endpoint para obtener datos de una factura específica con detalles de cliente y productos
app.get("/api/factura/:id", (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT f.*, c.nombre, c.apellido, c.cuit, c.correo, c.numerotel, c.direccion, p.nombrepro, p.codigopro, p.preciopro, p.cantidad
    FROM facturas f
    JOIN clientes c ON f.cliente_id = c.id
    JOIN productos p ON f.producto_id = p.id
    WHERE f.id = ?
  `;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error al obtener la factura:", err);
      res.status(500).json({ error: "Error al obtener la factura" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: "Factura no encontrada" });
      return;
    }
    res.status(200).json(result[0]);
  });
});


app.get("/api/clienteslist", (req, res) => {
  const query = "SELECT * FROM clientes";
  db.query(query, (err, rows) => {
    if (err) {
      console.error("Error obteniendo productos:", err);
      res.status(500).json({ error: "Error obteniendo productos" });
      return;
    }
    res.json(rows);
  });
});


app.delete("/api/clientes/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM clientes WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error eliminando datos de la base de datos:", err);
      res
        .status(500)
        .json({ error: "Error eliminando datos en la base de datos" });
      return;
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  });
});

app.put("/api/clientes/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, cuit, correo, numerotel, direccion } = req.body;

  const query = `
    UPDATE clientes 
    SET nombre = ?, apellido = ?, cuit = ?, correo = ?, numerotel = ?, direccion = ?
    WHERE id = ?
  `;
  db.query(
    query,
    [nombre, apellido, cuit, correo, numerotel,direccion, id],
    (err, result) => {
      if (err) {
        console.error("Error actualizando datos en la base de datos:", err);
        res
          .status(500)
          .json({ error: "Error actualizando datos en la base de datos" });
        return;
      }
      res.status(200).json({ message: "Datos actualizados exitosamente" });
    }
  );
});

const generarNumeroFactura = () => {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const día = String(fecha.getDate()).padStart(2, '0');
  const númeroAleatorio = Math.floor(Math.random() * 10000);
  return `${año}${mes}${día}-${númeroAleatorio}`;
};

app.post("/api/factura", async (req, res) => {
  const { cuitCliente, fecha, total, items } = req.body;
  const numeroFactura = generarNumeroFactura();

  try {
    // Iniciar transacción
    await db.promise().beginTransaction();

    // Obtener el ID del cliente
    const [clienteResults] = await db.promise().query("SELECT id FROM clientes WHERE cuit = ?", [cuitCliente]);
    if (clienteResults.length === 0) {
      throw new Error("Cliente no encontrado");
    }
    const clienteId = clienteResults[0].id;

    // Insertar la factura
    const [facturaResult] = await db.promise().query(
      "INSERT INTO factura (cliente_id, fecha, total , numeroFactura) VALUES (?, ?, ?,?)",
      [clienteId, fecha, total,numeroFactura]
    );
    const facturaId = facturaResult.insertId;

    // Insertar los detalles de la factura
    for (const item of items) {
      const [productoResults] = await db.promise().query(
        "SELECT id FROM productos WHERE codigopro = ?",
        [item.codigo]
      );
      if (productoResults.length === 0) {
        throw new Error(`Producto con código ${item.codigo} no encontrado`);
      }
      const productoId = productoResults[0].id;

      await db.promise().query(
        "INSERT INTO detalle_factura (factura_id, producto_id, cantidad) VALUES (?, ?, ?)",
        [facturaId, productoId, item.cantidad]
      );
    }

    // Confirmar transacción
    await db.promise().commit();
    res.status(200).json({ 
      message: "Factura guardada exitosamente", 
      facturaId: facturaId,
      numeroFactura: numeroFactura // Devuelve el número de factura generado
    });

  } catch (error) {
    // Revertir transacción en caso de error
    await db.promise().rollback();
    console.error("Error al guardar la factura:", error);
    res.status(500).json({ error: error.message || "Error al guardar la factura" });
  }
});

app.get('/api/FacturaList', (req, res) => {
  const sql = 'SELECT * FROM factura';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching facturas:', err);
      res.status(500).json({ error: 'Failed to fetch facturas' });
      return;
    }
    res.json(results);
  });
});

// Endpoint para actualizar una factura
app.put('/api/factura/:id', (req, res) => {
  const { id } = req.params;
  const { cliente_id, fecha, total } = req.body;
  
  const sql = 'UPDATE factura SET cliente_id = ?, fecha = ?, total = ? WHERE id = ?';
  const values = [cliente_id, fecha, total, id];
  
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating factura:', err);
      res.status(500).json({ error: 'Failed to update factura' });
      return;
    }
    res.json({ message: 'Factura updated successfully' });
  });
});

// Endpoint para eliminar una factura
app.delete('/api/factura/:id', (req, res) => {
  const { id } = req.params;
  
  const sql = 'DELETE FROM factura WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting factura:', err);
      res.status(500).json({ error: 'Failed to delete factura' });
      return;
    }
    res.json({ message: 'Factura deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
