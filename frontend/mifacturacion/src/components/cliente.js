import { useState } from "react";

export default function Example() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cuit: "",
    correo: "",
    numerotel: "",
    direccion: "",
  });
  //El hook useState se utiliza para añadir estado a los componentes funcionales en React.
  // Devuelve un array con dos elementos:
// El estado actual.
// Una función para actualizar ese estado.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/cliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // body: JSON.stringify(formData) convierte formData 
    // (que es un objeto JavaScript) en una cadena JSON y la incluye en el cuerpo de la solicitud.
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Nuevo cliente
        </h2>
      </div>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Nombre
            </label>
            <div className="mt-2.5">
              <input
                id="nombre"
                name="nombre"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="apellido"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Apellido
            </label>
            <div className="mt-2.5">
              <input
                id="apellido"
                name="apellido"
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.apellido}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="cuit"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              CUIT
            </label>
            <div className="mt-2.5">
              <input
                id="cuit"
                name="cuit"
                type="number"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.cuit}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="correo"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Correo
            </label>
            <div className="mt-2.5">
              <input
                id="correo"
                name="correo"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.correo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="numerotel"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Numero Teléfono
            </label>
            <div className="mt-2.5">
              <input
                id="numerotel"
                name="numerotel"
                type="text"
                autoComplete="numerotel"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.numerotel}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="direccion"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            direccion
          </label>
          <div className="mt-2.5">
            <input
              id="direccion"
              name="direccion"
              type="text"
              autoComplete="family-name"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
