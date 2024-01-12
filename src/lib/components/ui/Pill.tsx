export const Pill = ({ children }: { children: any }) => {
  return (
    <div className="flex bg-gray-100 rounded-full py-1 px-2 text-center items-center w-fit">
      {children}
    </div>
  );
};
