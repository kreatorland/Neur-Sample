import { INTEGRATIONS } from '../data/integrations';
import { IntegrationCard } from './integration-card';

export function IntegrationsGrid() {
  return (
    <div className="relative">
      <div className=" grid grid-cols-1 gap-4 sm:grid-cols-3">
        {INTEGRATIONS.map((item, index) => (
          <IntegrationCard
            key={item.label}
            item={item}
            index={index}
            onClick={() => {
              // TODO: Implement integration click handler
              console.log(`Clicked ${item.label}`);
            }}
          />
        ))}
      </div>
      <div
        className="absolute  w-[1000px] border border-t-2"
        style={{ left: '-115px', top: '130px' }}
      ></div>
      <div
        className="l-[252px] absolute top-[-48px] h-[400px] border "
        style={{ left: '252px', height: '355px' }}
      ></div>
      <div
        className="absolute top-[-48px] h-[400px] border "
        style={{ left: '515px', height: '355px' }}
      ></div>
    </div>
  );
}
