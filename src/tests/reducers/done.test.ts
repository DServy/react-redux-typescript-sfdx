import done from '../../reducers/done'
import * as actions from '../../actions/done'

it('Should update state with new done', () => {
    let t = "I am a new done"
    expect(done([], actions.addDone(t))).toEqual([t])
})
it('Should remove a done', () => {
    let dones = ['one', 'two', 'three']
    //remove the "two" done
    expect(done(dones, actions.removeDone(1))).toEqual(['one', 'three'])
})