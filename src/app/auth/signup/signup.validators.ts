import { AbstractControl, ValidationErrors, FormGroup, ValidatorFn } from '@angular/forms';

export class SignupValidators {
    static emailFieldsMustMatch: ValidatorFn = (fg: FormGroup) => {
        const email = fg.get('email').value;
        const confirmEmail = fg.get('confirmEmail').value;
        return email == confirmEmail ? null : { 'emailDidNotMatch': true };
    }

    static passwordFieldsMustMatch: ValidatorFn = (fg: FormGroup) => {
        const password = fg.get('password').value;
        const confirmPassword = fg.get('confirmPassword').value;
        return password == confirmPassword ? null : { 'passDidNotMatch': true };
    }

    static fitnessGoalOtherEmpty: ValidatorFn = (fg: FormGroup) => {
        const fitnessGoal = fg.get('fitnessGoal').value;
        const fitnessGoalOther = fg.get('fitnessGoalOther').value;

        if (fitnessGoal == 'Other' && (fitnessGoalOther == '' || fitnessGoalOther == null)) {
            return { 'specifyOther': true };
        }
        return null;
    }
}