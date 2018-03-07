import { PartialCollectionView } from '../words/words.service';

export class CognitiveType {
  public id: number;
  public name: string;
  public parent?: CognitiveType;

  constructor(data?: Partial<CognitiveType>) {
    Object.assign(this, data || {});
  }
}

export class CognitiveTypesListResponse {
  public cognitive_types: CognitiveType[];
  public view: PartialCollectionView;
  public totalItems: number;

  constructor(data?: Partial<any>) {
    if (data._embedded.cognitive_types) {
      this.cognitive_types = data._embedded.cognitive_types.map(
        (cognitiveType) => new CognitiveType(cognitiveType)
      );
    } else {
      this.cognitive_types = [];
    }

    this.view = new PartialCollectionView({
      count: data.count,
      limit: data.limit,
      page: data.page,
      pages: data.pages,
      total: data.total,
      first: data._links.first.href,
      last: data._links.last.href,
      next: data._links.next ? data._links.next.href : null,
      previous: data._links.previous ? data._links.previous.href : null,
      current: data._links.self.href
    });
    this.totalItems = data.total;
  }
}
