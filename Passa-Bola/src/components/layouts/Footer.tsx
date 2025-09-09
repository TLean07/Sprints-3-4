export const Footer = () => {
  return (
    <footer className="bg-purple-800 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-heading font-extrabold text-2xl">Passa a Bola</p>
          <p className="mt-2 text-sm text-gray-300 font-body">
            Tecnologia & Futebol Feminino
          </p>
          <p className="mt-6 text-xs text-gray-400 font-body">
            &copy; {new Date().getFullYear()} Passa a Bola. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};