export class SokobanLevels {
  public static levels = {
    length: 4,
    1: {
      width: 19,
      height: 11,
      no: 1,
      map: [
        '    #####',
        '    #   #',
        '    #$  #',
        '  ###  $##',
        '  #  $ $ #',
        '### # ## #===######',
        '#   # ## #####  ..#',
        '# $  $          ..#',
        '##### ### #@##  ..#',
        '    #     #########',
        '    #######'
      ]
    },
    2: {
      width: 8,
      height: 8,
      no: 2,
      map: [
        '####',
        '#  #',
        '#  #####',
        '#      #',
        '##  #$ #',
        '# @.#  #',
        '#   ####',
        '#####===',
      ]
    },
    3: {
      width: 5,
      height: 3,
      no: 3,
      map: [
        '#####',
        '#@$.#',
        '#####',
      ]
    },
    4: {
      width: 5,
      height: 3,
      no: 4,
      map: [
        '#####',
        '#@$.#',
        '#####',
      ]
    }
  };
}