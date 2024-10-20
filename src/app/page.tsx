import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

export default function Home() {
  return (
    <div className='flex gap-4'>
      <Input />
      <Select>
        <option>Test</option>
      </Select>
      <Button variant='primary' size='xs' disabled>
        Primary123
      </Button>
      <Button variant='secondary' size='xs'>
        Secondary
      </Button>
    </div>
  );
}
