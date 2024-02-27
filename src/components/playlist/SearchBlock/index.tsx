import SearchForm from './SearchForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { searchArtist } from '@/lib/actions/artist';

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
        {/* <form className="mt-4" action={searchArtist}> */}
        {/*   <label htmlFor="artist">Enter artist name</label> */}
        {/*   <fieldset className="flex items-center gap-2"> */}
        {/*     <Input */}
        {/*       placeholder="Taylor Swift" */}
        {/*       name="artist" */}
        {/*       className="mt-1 w-full text-lg bg-secondary" */}
        {/*     /> */}
        {/*     <Button type="submit" variant="secondary"> */}
        {/*       Create */}
        {/*     </Button> */}
        {/*   </fieldset> */}
        {/* </form> */}
        <SearchForm />
      </div>
    </div>
  );
}
