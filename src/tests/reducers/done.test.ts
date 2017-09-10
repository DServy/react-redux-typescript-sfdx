import done from '../../reducers/done'
import * as actions from '../../actions/done'
import { Task } from '../../objects/sObjects';

it('Should update state with new done', () => {
    let t = new Task()
    expect(done([], actions.addDone(t))).toEqual([t])
})
it('Should remove a done', () => {
    const task1 = new Task();
    const task2 = new Task();
    const task3 = new Task();
    let dones = [task1, task2, task3]
    //remove the "two" done
    expect(done(dones, actions.removeDone(1))).toEqual([task1, task3])
})