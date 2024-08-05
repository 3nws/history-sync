import { Injectable } from '@nestjs/common';
import { Action } from 'src/helpers/actions.enum';
import { Record } from 'src/record/record.entity';
import { User } from 'src/users/users.entity';
import {
  createMongoAbility,
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';

type Subjects = InferSubjects<typeof Record | typeof User> | 'all';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    can(Action.Read, Record);
    can(Action.Manage, Record, { authorId: user.id });

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
