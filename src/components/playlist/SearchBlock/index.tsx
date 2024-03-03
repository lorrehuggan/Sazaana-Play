import SearchForm from './SearchForm';

export default function SearchBlock() {
  return (
    <div className="mx-auto mt-8 w-11/12 max-w-5xl rounded-xl border-[1px] border-foreground">
      <div className="rounded-xl p-8">
        <h1 className="text-5xl font-black tracking-tighter">
          Create Your Next Favorite Playlist:
        </h1>
        <SearchForm />
      </div>
    </div>
  );
}
