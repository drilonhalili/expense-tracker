import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/locations/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/locations/butel">Butel</Link>
        </li>
        <li>
          <Link to="/locations/chair">Chair</Link>
        </li>
        <li>
          <Link to="/locations/emka">Emka</Link>
        </li>
        <li>
          <Link to="/locations/stadion">Stadion</Link>
        </li>
        <li>
          <Link to="/locations/kisella-voda">Kisella Voda</Link>
        </li>
      </ul>
    </div>
  )
}
