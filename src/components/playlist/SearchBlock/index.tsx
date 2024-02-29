import SearchForm from './SearchForm';

export default function SearchBlock() {
  return (
    <div className="mx-auto mt-8 w-11/12 max-w-5xl">
      <div className="rounded-xl bg-foreground p-8 text-background">
        <h1 className="text-5xl font-black tracking-tighter">
          This Is A Playslist Builder.
        </h1>
        <h1 className="text-5xl font-black tracking-tighter">
          Discover Your Next Favorite Song:
        </h1>
        <SearchForm />
      </div>
    </div>
  );
}
