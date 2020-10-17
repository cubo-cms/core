/** @package        @cubo-cms/core
  * @version        0.0.7
  * @copyright      2020 Cubo CMS <https://cubo-cms.com/COPYRIGHT.md>
  * @license        MIT license <https://cubo-cms.com/LICENSE.md>
  * @author         Papiando <info@papiando.com>
  * @module         Timer
  * @description    Timer class - Helper class for timers
  **/

/** TODO: Consider timers "at" and "atEvery" to set timers for a specific time
  **/

/** @module Timer
  *
  * Timer class - Helper class for timers
  **/
export default class Timer {
  /** @property {object} default - holds default values
    **/
  static default = {
    delay: '1m'
  }
  /** static @function clear(timer)
    *
    * Static function clear - Clears timer that was previously set
    *
    * @param {object} timer
    **/
  clear(timer) {
    timer.unref();
  }
  /** static @function on(delay,process,param)
    *
    * Static function on - Sets timer to run after specified delay
    *
    * @param {int||string} delay
    * @param {function} process
    * @param {object} param
    * @return {object} - timer object
    **/
  on(delay = Time.default.delay, process, param = {}) {
    return setTimeout(process, Timer.parseDelay(delay), param);
  }
  /** static @function onEvery(delay,process,param)
    *
    * Static function onEvery - Sets timer to run at specified intervals
    *
    * @param {int||string} delay
    * @param {function} process
    * @param {object} param
    * @return {object} - timer object
    **/
  onEvery(delay = Time.default.delay, process, param = {}) {
    return setInterval(process, Timer.parseDelay(delay), param);
  }
  /** static @function parseDelay(delay)
    *
    * Static function parseDelay - Parses delay string to convert to ms
    *
    * @param {int||string} delay
    * @return {int}
    **/
  parseDelay(delay) {
    if(typeof delay === 'string') {
      switch(var lastChar = delay[delay.length - 1]) {
        case 's': // Second
          return delay.slice(0, -1).toInt() * 1000;
        case 'm': // Minute
          return delay.slice(0, -1).toInt() * 60000;
        case 'h': // Hour
          return delay.slice(0, -1).toInt() * 3600000;
        case 'd': // Day
          return delay.slice(0, -1).toInt() * 86400000;
        default:
          return Time.default.delay;
      }
    } else {      // Expect seconds
      return delay * 1000;
    }
  }
}
