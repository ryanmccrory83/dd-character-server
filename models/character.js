const Model = require('objection').Model;

class Character extends Model {

  static get tableName() {
    return 'character';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      weapons: {
        relation: Model.ManyToManyRelation,
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one. We use the file path version
        // here to prevent require loops.
        modelClass: __dirname + '/weapon',
        join: {
          from: 'character.id',
          // ManyToMany relation needs the `through` object to describe the join table.
          through: {
            from: 'character_weapon.character_id',
            to: 'character_weapon.weapon_id'
          },
          to: 'weapon.id'
        }
      }
    };
  }
}

module.exports = Character