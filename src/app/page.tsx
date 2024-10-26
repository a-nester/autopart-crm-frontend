import StatusLabel, { Status } from './components/status-label';

export default function Home() {
  return (
    <main>
      <h1 className="text-xl">Home page</h1>
      <StatusLabel status={Status.Active}>Active</StatusLabel>
      <StatusLabel status={Status.NotActive}>Active</StatusLabel>
      <StatusLabel status={Status.Pending}>Active</StatusLabel>
      <StatusLabel status={Status.Suspended}>Active</StatusLabel>
    </main>
  );
}
