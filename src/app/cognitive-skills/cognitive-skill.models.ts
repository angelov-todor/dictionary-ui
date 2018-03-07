import { PartialCollectionView } from '../words/words.service';
import { CognitiveType } from '../cognitive-types/cognitive-types.models';

export class CognitiveSkill {
  public id: number;
  public name: string;
  public cognitive_types?: CognitiveType[];

  constructor(data?: Partial<CognitiveSkill>) {
    Object.assign(this, data || {});
  }
}

export class CognitiveSkillsListResponse {
  public cognitive_skills: CognitiveSkill[];
  public view: PartialCollectionView;
  public totalItems: number;

  constructor(data?: Partial<any>) {
    if (data._embedded.cognitive_skills) {
      this.cognitive_skills = data._embedded.cognitive_skills.map(
        (cognitiveSkill) => new CognitiveSkill(cognitiveSkill)
      );
    } else {
      this.cognitive_skills = [];
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
