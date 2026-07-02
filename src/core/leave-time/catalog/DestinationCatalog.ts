import type { Destination, DestinationTypeId } from "../domain/types";

export class DestinationCatalog {
  private readonly destinations: Destination[];

  constructor(destinations: Destination[]) {
    this.destinations = destinations;
  }

  all(): Destination[] {
    return [...this.destinations];
  }

  byId(id: string): Destination | undefined {
    return this.destinations.find((destination) => destination.id === id);
  }

  byType(type: DestinationTypeId): Destination[] {
    return this.destinations.filter((destination) => destination.type === type);
  }

  findByAlias(query: string): Destination | undefined {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return undefined;

    return this.destinations.find((destination) => {
      const names = [
        destination.id,
        destination.name,
        destination.shortName,
        destination.canonicalName,
        ...(destination.aliases ?? []),
      ].filter((name): name is string => Boolean(name));

      return names.some((name) => name.toLowerCase() === normalized);
    });
  }
}
